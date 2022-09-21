package com.reactnativeavoidsoftinput.listeners

import android.view.View
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.facebook.react.uimanager.DisplayMetricsHolder
import com.facebook.react.uimanager.PixelUtil
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.math.max

class WindowInsetsListenerImpl : WindowInsetsListener {
  private var mDebounceShowJob: Job? = null
  private var mDebounceHideJob: Job? = null
  private var mDebounceHeightChangeJob: Job? = null
  private var mListener: SoftInputListener? = null
  private var mPreviousHeight: Int = 0
  private var mPreviousScreenHeight: Int = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels
  private var mPersistedFrom: Int? = null

  private val coroutineScope = CoroutineScope(Dispatchers.Default)
  private val mMinSoftInputHeightToDetect = PixelUtil.toPixelFromDIP(60f).toInt()

  private fun onShow(from: Int, to: Int) {
    mDebounceShowJob?.cancel()
    mDebounceHideJob?.cancel()
    mDebounceShowJob = coroutineScope.launch {
      delay(DEBOUNCE_DELAY_IN_MS)
      mListener?.onSoftInputShown(from, to)
      mDebounceShowJob = null
    }
  }

  private fun onHide(from: Int, to: Int) {
    mDebounceHideJob?.cancel()
    mDebounceShowJob?.cancel()
    mDebounceHideJob = coroutineScope.launch {
      delay(DEBOUNCE_DELAY_IN_MS)
      mListener?.onSoftInputHidden(from, to)
      mDebounceHideJob = null
    }
  }

  private fun onHeightChange(from: Int, to: Int) {
    mDebounceHeightChangeJob?.cancel()
    mDebounceHeightChangeJob = coroutineScope.launch {
      delay(DEBOUNCE_DELAY_IN_MS)

      val screenHeight = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels

      mListener?.onSoftInputHeightChange(from, to, screenHeight != mPreviousScreenHeight)
      mPreviousScreenHeight = screenHeight
      mPersistedFrom = null
      mPreviousHeight = to
      mDebounceHeightChangeJob = null
    }
  }

  private fun onApplyWindowInsetsListener(view: View) {
    val rootViewInsets = ViewCompat.getRootWindowInsets(view) ?: return
    val imeInsets = rootViewInsets.getInsets(WindowInsetsCompat.Type.ime())
    val systemBarsInsets = rootViewInsets.getInsets(WindowInsetsCompat.Type.systemBars())

    if (mPersistedFrom == null) {
      mPersistedFrom = mPreviousHeight
    }

    val imeHeight = max(imeInsets.bottom - systemBarsInsets.bottom, 0)

    onHeightChange(mPersistedFrom ?: mPreviousHeight, imeHeight)

    if (mPreviousHeight != imeHeight && imeHeight > mMinSoftInputHeightToDetect) {
      onShow(mPreviousHeight, imeHeight)
    } else if (mPreviousHeight != 0 && imeHeight <= mMinSoftInputHeightToDetect) {
      onHide(mPreviousHeight, 0)
    } else {
      mDebounceHideJob?.cancel()
    }
  }

  override fun setSoftInputListener(listener: SoftInputListener?) {
    mListener = listener
  }

  override fun registerWindowInsetsListener(view: View) {
    ViewCompat.setOnApplyWindowInsetsListener(view) { v, insets ->
      onApplyWindowInsetsListener(v)
      insets
    }
  }

  override fun unregisterWindowInsetsListener(view: View) {
    ViewCompat.setOnApplyWindowInsetsListener(view, null)
  }

  companion object {
    private const val DEBOUNCE_DELAY_IN_MS = 250L
  }
}

package com.reactnativeavoidsoftinput.listeners

import android.view.View
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.facebook.react.uimanager.DisplayMetricsHolder
import com.facebook.react.uimanager.PixelUtil
import kotlin.math.max
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class WindowInsetsListenerImpl : WindowInsetsListener {
    private var debounceShowJob: Job? = null
    private var debounceHideJob: Job? = null
    private var debounceHeightChangeJob: Job? = null
    private var softInputListener: SoftInputListener? = null
    private var previousHeight: Int = 0
    private var previousScreenHeight: Int =
        DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels
    private var persistedFrom: Int? = null

    private val coroutineScope = CoroutineScope(Dispatchers.Default)
    private val minSoftInputHeightToDetect = PixelUtil.toPixelFromDIP(60f).toInt()

    private fun onShow(from: Int, to: Int) {
        debounceShowJob?.cancel()
        debounceHideJob?.cancel()
        debounceShowJob =
            coroutineScope.launch {
                delay(DEBOUNCE_DELAY_IN_MS)
                softInputListener?.onSoftInputShown(from, to)
                debounceShowJob = null
            }
    }

    private fun onHide(from: Int, to: Int) {
        debounceHideJob?.cancel()
        debounceShowJob?.cancel()
        debounceHideJob =
            coroutineScope.launch {
                delay(DEBOUNCE_DELAY_IN_MS)
                softInputListener?.onSoftInputHidden(from, to)
                debounceHideJob = null
            }
    }

    private fun onHeightChange(from: Int, to: Int) {
        debounceHeightChangeJob?.cancel()
        debounceHeightChangeJob =
            coroutineScope.launch {
                delay(DEBOUNCE_DELAY_IN_MS)

                val screenHeight = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels

                softInputListener?.onSoftInputHeightChange(
                    from,
                    to,
                    screenHeight != previousScreenHeight
                )
                previousScreenHeight = screenHeight
                persistedFrom = null
                previousHeight = to
                debounceHeightChangeJob = null
            }
    }

    private fun onApplyWindowInsetsListener(view: View) {
        val rootViewInsets = ViewCompat.getRootWindowInsets(view) ?: return
        val imeInsets = rootViewInsets.getInsets(WindowInsetsCompat.Type.ime())
        val systemBarsInsets = rootViewInsets.getInsets(WindowInsetsCompat.Type.systemBars())

        if (persistedFrom == null) {
            persistedFrom = previousHeight
        }

        val imeHeight = max(imeInsets.bottom - systemBarsInsets.bottom, 0)

        onHeightChange(persistedFrom ?: previousHeight, imeHeight)

        if (previousHeight != imeHeight && imeHeight > minSoftInputHeightToDetect) {
            onShow(previousHeight, imeHeight)
        } else if (previousHeight != 0 && imeHeight <= minSoftInputHeightToDetect) {
            onHide(previousHeight, 0)
        } else {
            debounceHideJob?.cancel()
        }
    }

    override fun setSoftInputListener(listener: SoftInputListener?) {
        softInputListener = listener
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

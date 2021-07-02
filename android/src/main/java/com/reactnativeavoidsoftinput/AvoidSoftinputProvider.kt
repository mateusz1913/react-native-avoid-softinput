package com.reactnativeavoidsoftinput

import android.graphics.Color
import android.graphics.Rect
import android.graphics.drawable.ColorDrawable
import android.view.*
import android.widget.PopupWindow
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.DisplayMetricsHolder
import com.facebook.react.uimanager.PixelUtil

class AvoidSoftinputProvider(): PopupWindow(), ViewTreeObserver.OnGlobalLayoutListener {
  private lateinit var mRootView: View
  private var mRect = Rect()
  private var mSoftInputHeight = 0
  private val mMinSoftInputHeightToDetect = PixelUtil.toPixelFromDIP(60f).toInt()
  private var mListener: SoftInputListener? = null
  private lateinit var mReactContext: ReactApplicationContext

  constructor(reactContext: ReactApplicationContext) : this() {
    mReactContext = reactContext
    mRootView = View(mReactContext.currentActivity)
    contentView = mRootView

    mRootView.viewTreeObserver.addOnGlobalLayoutListener(this)
    setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

    width = 0
    height = ViewGroup.LayoutParams.MATCH_PARENT

    softInputMode = WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE
    inputMethodMode = INPUT_METHOD_NEEDED
  }

  fun initializeProvider(): AvoidSoftinputProvider {
    val activity = mReactContext.currentActivity ?: return this
    if (!isShowing) {
      val decorView = activity.window.decorView

      decorView.post {
        showAtLocation(decorView, Gravity.NO_GRAVITY, 0, 0)
      }
    }

    return this
  }

  fun setSoftInputListener(listener: SoftInputListener?) {
    mListener = listener
  }

  override fun onGlobalLayout() {
    mRootView.getWindowVisibleDisplayFrame(mRect)
    val heightDiff = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels - mRect.bottom - getNavigationBarHeight()
    val isSoftInputPotentiallyShown = mSoftInputHeight != heightDiff && heightDiff > mMinSoftInputHeightToDetect

    if (!isSoftInputPotentiallyShown) {
      val isSoftInputPotentiallyHidden = mSoftInputHeight != 0 && heightDiff <= mMinSoftInputHeightToDetect

      if (isSoftInputPotentiallyHidden) {
        val previousSoftInputHeight = mSoftInputHeight
        mSoftInputHeight = 0
        onSoftInputHidden(previousSoftInputHeight, mSoftInputHeight)
      }
      return
    }

    val previousSoftInputHeight = mSoftInputHeight
    mSoftInputHeight = heightDiff
    onSoftInputShown(previousSoftInputHeight, mSoftInputHeight)
  }

  private fun getNavigationBarHeight(): Int {
    var navigationBarHeight = 0
    val resourceId: Int = mReactContext.resources.getIdentifier("navigation_bar_height", "dimen", "android")
    if (resourceId > 0) {
      navigationBarHeight = mReactContext.resources.getDimensionPixelSize(resourceId)
    }

    return navigationBarHeight
  }

  private fun onSoftInputShown(from: Int, to: Int) {
    mListener?.onSoftInputShown(from, to)
  }

  private fun onSoftInputHidden(from: Int, to: Int) {
    mListener?.onSoftInputHidden(from, to)
  }

  interface SoftInputListener {
    fun onSoftInputShown(from: Int, to: Int)
    fun onSoftInputHidden(from: Int, to: Int)
  }
}

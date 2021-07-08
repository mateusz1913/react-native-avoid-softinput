package com.reactnativeavoidsoftinput

import android.graphics.Color
import android.graphics.Rect
import android.graphics.drawable.ColorDrawable
import android.view.*
import android.widget.PopupWindow
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.DisplayMetricsHolder
import com.facebook.react.uimanager.PixelUtil
import java.util.Timer
import kotlin.concurrent.schedule

class AvoidSoftInputProvider(): PopupWindow(), ViewTreeObserver.OnGlobalLayoutListener {
  private lateinit var mRootView: View
  private var mParent: View? = null
  private var mRect = Rect()
  private var mSoftInputHeight = 0
  private val mMinSoftInputHeightToDetect = PixelUtil.toPixelFromDIP(60f).toInt()
  private var mListener: SoftInputListener? = null
  private lateinit var mReactContext: ReactContext
  private lateinit var mShowTimer: Timer
  private lateinit var mHideTimer: Timer

  constructor(reactContext: ReactContext) : this(reactContext, null)

  constructor(reactContext: ReactContext, rootView: ViewGroup?): this() {
    mReactContext = reactContext
    mRootView = View(mReactContext.currentActivity)
    mParent = rootView
    contentView = mRootView

    mShowTimer = Timer("showTimer", true)
    mHideTimer = Timer("hideTimer", true)

    mRootView.viewTreeObserver.addOnGlobalLayoutListener(this)
    setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

    width = 0
    height = ViewGroup.LayoutParams.MATCH_PARENT

    softInputMode = WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE
    inputMethodMode = INPUT_METHOD_NEEDED
  }

  fun initializeProvider(): AvoidSoftInputProvider {
    val activity = mReactContext.currentActivity ?: return this
    if (!isShowing) {
      if (mParent != null) {
        mParent?.post {
          showAtLocation(mParent, Gravity.NO_GRAVITY, 0, 0)
        }
      }
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
    val heightDiff = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels - mRect.bottom - getNavigationBarHeight(mReactContext)
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

  private fun onSoftInputShown(from: Int, to: Int) {
    mShowTimer.cancel()
    mShowTimer = Timer("showTimer", true)
    mShowTimer.schedule(100) {
      mListener?.onSoftInputShown(from, to)
      mShowTimer.cancel()
    }
  }

  private fun onSoftInputHidden(from: Int, to: Int) {
    mHideTimer.cancel()
    mHideTimer = Timer("hideTimer", true)
    mHideTimer.schedule(100) {
      mListener?.onSoftInputHidden(from, to)
      mHideTimer.cancel()
    }
  }

  interface SoftInputListener {
    fun onSoftInputShown(from: Int, to: Int)
    fun onSoftInputHidden(from: Int, to: Int)
  }
}

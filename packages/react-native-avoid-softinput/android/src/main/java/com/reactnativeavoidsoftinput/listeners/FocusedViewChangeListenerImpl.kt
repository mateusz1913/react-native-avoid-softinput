package com.reactnativeavoidsoftinput.listeners

import android.view.View
import android.view.ViewTreeObserver

class FocusedViewChangeListenerImpl : FocusedViewChangeListener {
  private var mCurrentFocusedView: View? = null
  private var mPreviousFocusedView: View? = null
  private var mOnFocusListener: ((oldView: View?, newView: View?) -> Unit)? = null

  private val mOnGlobalFocusChangeListener = ViewTreeObserver.OnGlobalFocusChangeListener { oldView, newView ->
    mCurrentFocusedView = newView
    mPreviousFocusedView = oldView

    mOnFocusListener?.invoke(oldView, newView)
  }

  override val currentFocusedView: View?
    get() = mCurrentFocusedView
  override val previousFocusedView: View?
    get() = mPreviousFocusedView

  override fun setOnFocusListener(listener: ((oldView: View?, newView: View?) -> Unit)?) {
    mOnFocusListener = listener
  }

  override fun registerFocusedViewChangeListener(rootView: View) {
    rootView.viewTreeObserver.addOnGlobalFocusChangeListener(mOnGlobalFocusChangeListener)
  }

  override fun unregisterFocusedViewChangeListener(rootView: View) {
    rootView.viewTreeObserver.removeOnGlobalFocusChangeListener(mOnGlobalFocusChangeListener)
  }
}

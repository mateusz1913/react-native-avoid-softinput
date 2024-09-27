package com.reactnativeavoidsoftinput.listeners

import android.view.View
import android.view.ViewTreeObserver

class FocusedViewChangeListenerImpl : FocusedViewChangeListener {
    private var currentView: View? = null
    private var previousView: View? = null
    private var onFocusListener: ((oldView: View?, newView: View?) -> Unit)? = null

    private val mOnGlobalFocusChangeListener =
        ViewTreeObserver.OnGlobalFocusChangeListener { oldView, newView ->
            currentView = newView
            previousView = oldView

            onFocusListener?.invoke(oldView, newView)
        }

    override val currentFocusedView: View?
        get() = currentView

    override val previousFocusedView: View?
        get() = previousView

    override fun setOnFocusListener(listener: ((oldView: View?, newView: View?) -> Unit)?) {
        onFocusListener = listener
    }

    override fun registerFocusedViewChangeListener(rootView: View) {
        rootView.viewTreeObserver.addOnGlobalFocusChangeListener(mOnGlobalFocusChangeListener)
    }

    override fun unregisterFocusedViewChangeListener(rootView: View) {
        rootView.viewTreeObserver.removeOnGlobalFocusChangeListener(mOnGlobalFocusChangeListener)
    }
}

package com.reactnativeavoidsoftinput.listeners

import android.view.View

interface FocusedViewChangeListener {
  val currentFocusedView: View?

  val previousFocusedView: View?

  fun setOnFocusListener(listener: ((oldView: View?, newView: View?) -> Unit)?)

  fun registerFocusedViewChangeListener(rootView: View)

  fun unregisterFocusedViewChangeListener(rootView: View)
}

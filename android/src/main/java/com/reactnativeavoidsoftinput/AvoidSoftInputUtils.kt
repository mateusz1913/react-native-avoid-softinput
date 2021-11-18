package com.reactnativeavoidsoftinput

import android.content.Context
import android.view.View
import android.widget.ScrollView
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.RootView

fun getScrollViewParent(view: View?, rootView: View): ScrollView? {
  if (view == null || view.parent == rootView || view.parent !is View) {
    return null
  }

  if (view.parent is ScrollView) {
    return view.parent as ScrollView
  }

  return getScrollViewParent(view.parent as View, rootView)
}

fun checkIfNestedInAvoidSoftInputView(view: View, rootView: RootView?): Boolean {
  if (view.parent == null || view.parent == rootView || view.parent !is View) {
    return false
  }

  if (view.parent is AvoidSoftInputView) {
    return true
  }
  return checkIfNestedInAvoidSoftInputView(view.parent as View, rootView)
}

fun getNavigationBarHeight(context: Context): Int {
  var navigationBarHeight = 0
  val resourceId: Int = context.resources.getIdentifier("navigation_bar_height", "dimen", "android")
  if (resourceId > 0) {
    navigationBarHeight = context.resources.getDimensionPixelSize(resourceId)
  }

  return navigationBarHeight
}

fun convertFromPixelToDIP(to: Int): Int {
  return PixelUtil.toDIPFromPixel(to.toFloat()).toInt()
}

fun getReactRootView(view: View?): RootView? {
  var currentView: View? = view
  while (true) {
    if (currentView == null) {
      return null
    }
    if (currentView is RootView) {
      return currentView
    }
    val next = currentView.parent
    if (next !is View) {
      return null
    }
    currentView = next
  }
}

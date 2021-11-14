package com.reactnativeavoidsoftinput

import android.content.Context
import android.view.View
import android.widget.ScrollView
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.RootView

fun getRelativeY(view: View, rootView: View): Int {
  if (view.parent == null || view.parent !is View) {
    return view.top
  }

  if (view.parent == rootView) {
    return view.top + (view.parent as View).top
  }

  return view.top + getRelativeY(view.parent as View, rootView)
}

fun getPositionYRelativeToScrollViewParent(view: View, rootView: View): Int {
  if (view.parent == null || view.parent == rootView || view.parent is ScrollView || view.parent !is View) {
    return view.top
  }

  return view.top + getPositionYRelativeToScrollViewParent(view.parent as View, rootView)
}

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

fun computeSoftInputOffset(softInputHeight: Int, currentFocusedView: View?, rootView: View): Int? {
  if (currentFocusedView == null) {
    return null
  }

  val navigationBarHeight = getNavigationBarHeight(rootView.context)
  val statusBarHeight = getStatusBarHeight(rootView.context)

  val scrollView = getScrollViewParent(currentFocusedView, rootView)
  val currentFocusedViewPositionY = when (scrollView != null) {
    true -> getRelativeY(scrollView, rootView) + (getPositionYRelativeToScrollViewParent(
      currentFocusedView,
      scrollView
    ) - scrollView.scrollY)
    else -> getRelativeY(currentFocusedView, rootView)
  } + currentFocusedView.height + statusBarHeight

  val currentFocusedViewBottomDistance = (rootView.top + rootView.height - navigationBarHeight) - currentFocusedViewPositionY

  if (softInputHeight - currentFocusedViewBottomDistance < 0) {
    return null
  }
  return softInputHeight - currentFocusedViewBottomDistance
}

fun getStatusBarHeight(context: Context): Int {
  var statusBarHeight = 0
  val resourceId = context.resources.getIdentifier("status_bar_height", "dimen", "android")
  if (resourceId > 0) {
    statusBarHeight = context.resources.getDimensionPixelSize(resourceId)
  }

  return statusBarHeight
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

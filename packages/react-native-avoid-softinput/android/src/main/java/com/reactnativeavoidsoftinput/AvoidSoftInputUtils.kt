package com.reactnativeavoidsoftinput

import android.content.Context
import android.os.Build
import android.view.View
import android.view.WindowInsets
import android.widget.ScrollView
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.RootView
import kotlin.math.min

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

/**
 * Get bottom navigation bar inset (if it exists), like in react-native-safe-area-context library
 *
 * https://github.com/th3rdwave/react-native-safe-area-context/blob/main/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaUtils.kt
 */

@RequiresApi(Build.VERSION_CODES.R)
private fun getRootWindowBottomInsetR(rootView: View): Int? {
  val insets =
    rootView.rootWindowInsets?.getInsets(
      WindowInsets.Type.statusBars() or
        WindowInsets.Type.displayCutout() or
        WindowInsets.Type.navigationBars())
      ?: return null
  return insets.bottom
}

@RequiresApi(Build.VERSION_CODES.M)
@Suppress("DEPRECATION")
private fun getRootWindowBottomInsetM(rootView: View): Int? {
  val insets = rootView.rootWindowInsets ?: return null
  return min(insets.systemWindowInsetBottom, insets.stableInsetBottom)
}

private fun getRootWindowBottomInsetCompat(rootView: View): Int? {
  val visibleRect = android.graphics.Rect()
  rootView.getWindowVisibleDisplayFrame(visibleRect)
  return (rootView.height - visibleRect.bottom)
}

fun getRootViewBottomInset(reactContext: ReactContext): Int? {
  val rootView = reactContext.currentActivity?.window?.decorView?.rootView ?: return null
  return when {
    Build.VERSION.SDK_INT >= Build.VERSION_CODES.R -> getRootWindowBottomInsetR(rootView)
    Build.VERSION.SDK_INT >= Build.VERSION_CODES.M -> getRootWindowBottomInsetM(rootView)
    else -> getRootWindowBottomInsetCompat(rootView)
  }
}

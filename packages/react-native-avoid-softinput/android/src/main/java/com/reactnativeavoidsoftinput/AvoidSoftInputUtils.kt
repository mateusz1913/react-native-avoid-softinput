package com.reactnativeavoidsoftinput

import android.content.Context
import android.os.Build
import android.util.Log
import android.view.View
import android.widget.ScrollView
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.allViews
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.DisplayMetricsHolder
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.RootView
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.EventDispatcher

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

fun getReactRootView(reactContext: ReactApplicationContext): RootView? {
  val activity = reactContext.currentActivity ?: return null
  val decorRootView = activity.window.decorView

  return decorRootView.allViews.find { it is RootView } as RootView?
}

fun getNearestParentReactRootView(view: View?): RootView? {
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

fun getRootViewBottomInset(view: View): Int {
  val insets = ViewCompat.getRootWindowInsets(view)?.getInsets(WindowInsetsCompat.Type.systemBars())

  return insets?.bottom ?: 0
}

fun getViewDistanceToBottomEdge(view: View): Int {
  val viewLocation = IntArray(2)
  view.getLocationOnScreen(viewLocation)
  return DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels - (viewLocation[1] + view.height) - getRootViewBottomInset(view)
}

fun setScrollListenerCompat(scrollView: ScrollView, listener: ((scrollY: Int) -> Unit)?) {
  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    scrollView.setOnScrollChangeListener { _, _, scrollY, _, _ ->
      listener?.invoke(scrollY)
    }
  }
}

/** Available from RN 0.63 */
fun getEventDispatcher(context: ReactContext, view: View): EventDispatcher? {
  val reactTag = view.id
  return UIManagerHelper.getEventDispatcherForReactTag(context, reactTag)
}

/** Available from RN 0.63 */
fun getReactContext(view: View): ReactContext {
  return UIManagerHelper.getReactContext(view)
}

/** Available from RN 0.65, on non-Fabric, returns -1 */
fun getSurfaceId(context: Context): Int {
  return UIManagerHelper.getSurfaceId(context)
}

object ReactNativeAvoidSoftInputLogger {
  @JvmStatic
  fun log(tag: String, message: String) {
    Log.d(tag, message)
  }
}

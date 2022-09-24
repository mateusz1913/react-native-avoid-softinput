package com.fabricavoidsoftinputexample

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.zoontek.rnbootsplash.RNBootSplash

class MainActivity : ReactActivity() {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String {
    return "FabricAvoidSoftinputExample"
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this)
    super.onCreate(null)
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return MainActivityDelegate(this, mainComponentName)
  }

  companion object {
    class MainActivityDelegate(
      activity: ReactActivity,
      mainComponentName: String
    ) : ReactActivityDelegate(activity, mainComponentName) {
      override fun createRootView(): ReactRootView {
        val reactRootView = ReactRootView(context)
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED)
        return reactRootView
      }

      override fun isConcurrentRootEnabled(): Boolean {
        // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
        // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
        return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      }
    }
  }
}

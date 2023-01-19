/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * <p>This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */
package com.example.reactnativeavoidsoftinput

import android.content.Context
import com.facebook.react.ReactInstanceManager

/**
 * Class responsible of loading Flipper inside your React Native application. This is the debug
 * flavor of it. Here you can add your own plugins and customize the Flipper setup.
 */
object ReactNativeFlipper {
  @JvmStatic
  fun initializeFlipper(context: Context?, reactInstanceManager: ReactInstanceManager) {
    // Do nothing as we don't want to initialize Flipper on Release.
  }
}

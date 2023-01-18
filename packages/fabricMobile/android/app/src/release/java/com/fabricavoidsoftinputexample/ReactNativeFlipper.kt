/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * <p>This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */
package com.fabricavoidsoftinputexample

import android.content.Context
import com.facebook.react.ReactInstanceManager
/**
 * Class responsible of loading Flipper inside your React Native application. This is the release
 * flavor of it so it's empty as we don't want to load Flipper.
 */
object ReactNativeFlipper {
  @JvmStatic
  fun initializeFlipper(context: Context?, reactInstanceManager: ReactInstanceManager) {
    // Do nothing as we don't want to initialize Flipper on Release.
  }
}

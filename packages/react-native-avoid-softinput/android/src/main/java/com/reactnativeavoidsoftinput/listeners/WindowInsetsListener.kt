package com.reactnativeavoidsoftinput.listeners

import android.view.View

interface WindowInsetsListener {
  fun setSoftInputListener(listener: SoftInputListener?)
  fun registerWindowInsetsListener(view: View)
  fun unregisterWindowInsetsListener(view: View)
}

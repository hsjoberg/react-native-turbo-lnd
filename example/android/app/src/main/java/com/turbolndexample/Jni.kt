package jnibinding

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Bundle


interface SimpleCallback {
    fun onResult(result: String)
}

class Jni {
  // external fun hej(): Void
  external fun performOperation(callback: SimpleCallback)
}

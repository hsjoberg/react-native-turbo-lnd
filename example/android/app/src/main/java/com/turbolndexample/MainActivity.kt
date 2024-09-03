package com.turbolndexample

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Bundle

<<<<<<< HEAD
=======
import jnibinding.Jni
import jnibinding.SimpleCallback

>>>>>>> fddd1a8 (Initial commit)
class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "TurboLndExample"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)


  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
<<<<<<< HEAD
=======

    val jni = Jni()
    // jni.hej()

    jni.performOperation(object : SimpleCallback {
        override fun onResult(result: String) {
            android.util.Log.d("turbolnd", result)
            // println("result: $result")
        }
    })
    // hej()
>>>>>>> fddd1a8 (Initial commit)
  }
}

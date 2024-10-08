require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  if ENV['RCT_NEW_ARCH_ENABLED'] != '1'
    raise "[react-native-turbo-lnd]: This library only works in react-native new architecture."
  end

  s.name         = "react-native-turbo-lnd"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported, :osx => "11.0" }
  s.source       = { :git => "https://github.com/hsjoberg/react-native-turbo-lnd.git", :tag => "#{s.version}" }

  s.source_files = ["cpp/**/*.{h,hpp,cpp}", "ios/OnLoad.mm"]
  s.exclude_files = "cpp/build"

  # Use install_modules_dependencies helper to install the dependencies if React Native version >=0.71.0.
  # See https://github.com/facebook/react-native/blob/febf6b7f33fdb4904669f99d795eba4c0f95d7bf/scripts/cocoapods/new_architecture.rb#L79.
  install_modules_dependencies(s)
end

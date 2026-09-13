// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "ReactNativeAvoidSoftinput",
    platforms: [.iOS(.v15)],
    products: [
        .library(name: "ReactNativeAvoidSoftinput", targets: ["ReactNativeAvoidSoftinput"])
    ],
    dependencies: [
        .package(name: "ReactNative", path: "../../../../xcframeworks"),
        .package(name: "React-GeneratedCode", path: "../../../ios"),
    ],
    targets: [
        .target(
            name: "ReactNativeAvoidSoftinput",
            dependencies: [
                .product(name: "ReactHeaders", package: "ReactNative"),
                .product(name: "ReactNativeHeaders", package: "ReactNative"),
                .product(name: "ReactNativeDependenciesHeaders", package: "ReactNative"),
                .product(name: "ReactAppHeaders", package: "React-GeneratedCode"),
            ],
            path: ".",
            sources: [
                "ios/AvoidSoftInput.h",
                "ios/AvoidSoftInput.mm",
                "ios/AvoidSoftInputAnimationHandler.h",
                "ios/AvoidSoftInputAnimationHandler.mm",
                "ios/AvoidSoftInputAnimator.h",
                "ios/AvoidSoftInputAnimator.mm",
                "ios/AvoidSoftInputConstants.h",
                "ios/AvoidSoftInputConstants.mm",
                "ios/AvoidSoftInputListener.h",
                "ios/AvoidSoftInputListener.mm",
                "ios/AvoidSoftInputManager.h",
                "ios/AvoidSoftInputManager.mm",
                "ios/AvoidSoftInputUtils.h",
                "ios/AvoidSoftInputUtils.mm",
                "ios/AvoidSoftInputViewComponentView.h",
                "ios/AvoidSoftInputViewComponentView.mm",
                "ios/RCTConvert+UIViewAnimationOptions.h",
                "ios/RCTConvert+UIViewAnimationOptions.mm",
            ],
            publicHeadersPath: "ios",
            cSettings: [
                .headerSearchPath("ios"),
                .define("REACT_NATIVE_AVOID_SOFTINPUT_USING_SPM")
            ],
            cxxSettings: [
                .headerSearchPath("ios"),
                .define("REACT_NATIVE_AVOID_SOFTINPUT_USING_SPM"),
                .define("DEBUG", .when(configuration: .debug)),
                .define("NDEBUG", .when(configuration: .release))
            ],
            linkerSettings: [
                .linkedFramework("UIKit"),
                .linkedFramework("Foundation")
            ]
        )
    ],
    cxxLanguageStandard: .cxx20
)

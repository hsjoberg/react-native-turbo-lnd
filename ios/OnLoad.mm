#import "TurboLndModule.h"
#import <Foundation/Foundation.h>
#import <ReactCommon/CxxTurboModuleUtils.h>

@interface TurboLndModuleOnLoad : NSObject
@end

@implementation TurboLndModuleOnLoad

+ (void)load {
  facebook::react::registerCxxModuleToGlobalModuleMap(
      std::string(facebook::react::TurboLndModule::kModuleName),
      [&](std::shared_ptr<facebook::react::CallInvoker> jsInvoker) {
        return std::make_shared<facebook::react::TurboLndModule>(jsInvoker);
      });
}

@end

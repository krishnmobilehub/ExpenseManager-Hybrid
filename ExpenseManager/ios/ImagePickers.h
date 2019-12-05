
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "AppDelegate.h"
NS_ASSUME_NONNULL_BEGIN

@interface ImagePickers : RCTEventEmitter <UIImagePickerControllerDelegate, UINavigationControllerDelegate, UIActionSheetDelegate>{
    UIImagePickerController *imagePicker;
    NSString *idStrings;
    AppDelegate *app;
}

@end

NS_ASSUME_NONNULL_END

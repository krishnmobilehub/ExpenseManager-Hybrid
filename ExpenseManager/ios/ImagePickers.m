
#import "ImagePickers.h"
#import "AppDelegate.h"
@implementation ImagePickers

RCT_EXPORT_MODULE();
- (NSArray<NSString *> *)supportedEvents {
  return @[@"onImagePath"];
}
RCT_EXPORT_METHOD(permissionCamera:(NSString *)idString) {
  idStrings = idString;
  app = (AppDelegate *)[[UIApplication sharedApplication]delegate];
 
  UIAlertController* alert = [UIAlertController alertControllerWithTitle:@"Choose" message:@"" preferredStyle:UIAlertControllerStyleAlert];
  
  UIAlertAction* takephoto = [UIAlertAction actionWithTitle:@"Take Photo" style:UIAlertActionStyleDefault
                                                    handler:^(UIAlertAction * action) {
                                                      if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera]) {
                                                        [self takePhoto];
                                                      }
                                                    }];
  UIAlertAction* galarry = [UIAlertAction actionWithTitle:@"Choose From Library" style:UIAlertActionStyleDefault
                                                  handler:^(UIAlertAction * action) {
                                                    [self choosePhotoFromLibrary];
                                                  }];
  UIAlertAction* cancel = [UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleDefault
                                                 handler:^(UIAlertAction * action) {
                                                   
                                                 }];
  
  [alert addAction:takephoto];
  [alert addAction:galarry];
  [alert addAction:cancel];
  [app.window.rootViewController presentViewController:alert animated:YES completion:nil];
  
}

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info {
  if (@available(iOS 11.0, *)) {
    NSURL *imagePath = [info valueForKey:UIImagePickerControllerImageURL];
    NSString *strUrl = imagePath.absoluteString;
    [self sendEventWithName:@"onImagePath" body:@{@"id":idStrings,@"imageDatas":strUrl}];
  } else {
    // Fallback on earlier versions
  }
  [picker dismissViewControllerAnimated:YES completion:nil];
}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker {
  [picker dismissViewControllerAnimated:YES completion:nil];
}

- (void)takePhoto {
  imagePicker = [[UIImagePickerController alloc] init];
  imagePicker.sourceType = UIImagePickerControllerSourceTypeCamera;
  imagePicker.delegate = self;
  imagePicker.allowsEditing = YES;
  [app.window.rootViewController presentViewController:imagePicker animated:YES completion:nil];
}

- (void)choosePhotoFromLibrary {
  imagePicker = [[UIImagePickerController alloc] init];
  imagePicker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
  imagePicker.delegate = self;
  imagePicker.allowsEditing = YES;
  [app.window.rootViewController presentViewController:imagePicker animated:YES completion:nil];
}
@end

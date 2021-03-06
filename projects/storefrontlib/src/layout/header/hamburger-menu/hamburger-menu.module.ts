import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { HamburgerMenuComponent } from './hamburger-menu.component';
@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        HamburgerMenuComponent: { selector: 'cx-hamburger-menu' },
      },
    }),
  ],
  declarations: [HamburgerMenuComponent],
  entryComponents: [HamburgerMenuComponent],
})
export class HamburgerMenuModule {}

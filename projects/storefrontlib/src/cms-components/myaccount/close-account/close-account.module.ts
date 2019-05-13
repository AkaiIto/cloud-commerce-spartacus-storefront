import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { I18nModule, UrlModule, AuthGuard } from '@spartacus/core';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { CloseAccountModalComponent } from './components/close-account-modal/close-account-modal.component';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { CloseAccountComponent } from './components/close-account/close-account.component';
import { PageLayoutModule } from '../../../cms-structure/page/page-layout/page-layout.module';
import { CmsPageGuard } from '../../../lib/cms/guards/cms-page.guard';
import { OutletRefModule } from '../../../cms-structure';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    component: CloseAccountComponent,
    data: { cxRoute: 'closeAccount' },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UrlModule,
    I18nModule,
    IconModule,
    SpinnerModule,
    PageLayoutModule,
    OutletRefModule,
  ],
  declarations: [CloseAccountComponent, CloseAccountModalComponent],
  exports: [CloseAccountComponent],
  entryComponents: [CloseAccountComponent, CloseAccountModalComponent],
})
export class CloseAccountModule {}

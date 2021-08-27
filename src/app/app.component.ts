import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { singleSpaPropsSubject } from 'src/single-spa/single-spa-props';


@Component({
  selector: 'mf-header',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mf-header';

  singleSpaProps?: any;
  subscription?: Subscription;
  logged = false;
  user?:string;

  constructor(private ChangeDetectorRef:ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.initSubscription();
  }

  initSubscription(){
    this.subscription = singleSpaPropsSubject.subscribe(
      props => {
        this.singleSpaProps = props;
        this.lookForEvents();
      }
    );
  }

  lookForEvents(){
    this.singleSpaProps['EventBus'].on('onUserLogged', this.onUserLogged.bind(this));
  }

  onUserLogged(data: any) {
    console.log("on user logged listening header ", data);
    this.logged = true;
    this.user = data.email;
    this.ChangeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

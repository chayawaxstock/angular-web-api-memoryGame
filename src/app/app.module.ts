import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";


//custom Modules
import { AppRoutingModule } from './app-routing.module';


//custom Service
import { UserService } from './shared/services/user.service';
import { GameComponent } from './game/game.component';
//custom Component

import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { ChoosePartnerComponent } from './choose-partner/choose-partner.component';


import { GameService } from './shared/services/game.service';
import { StartGameComponent } from './start-game/start-game.component';
import { CardComponent } from './card/card.component';
import { BoardComponent } from './board/board.component';
import { EndGameComponent } from './end-game/end-game.component';
import { AuthGuard } from './shared/auth.guard';


@NgModule({
  declarations: [
    RegisterComponent,AppComponent, ChoosePartnerComponent, GameComponent, StartGameComponent, CardComponent, BoardComponent, EndGameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule, // Need this module for the routing
    AppRoutingModule // Import app routing module

  ],
  providers: [
    UserService,GameService,AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

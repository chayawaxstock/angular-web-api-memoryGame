import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RegisterComponent } from "./register/register.component";
import { ChoosePartnerComponent } from "./choose-partner/choose-partner.component";
import { GameComponent } from "./game/game.component";
import { StartGameComponent } from "./start-game/start-game.component";
import { EndGameComponent } from "./end-game/end-game.component";
import { AuthGuard } from "./shared/auth.guard";

const appRoutes: Routes = [
    { path: "home", component: RegisterComponent },
    { path: "", component: RegisterComponent },
    {path:'choosePartner',component: ChoosePartnerComponent,canActivate:[AuthGuard]},
    {path:'game',component: GameComponent,canActivate:[AuthGuard]},
    {path:'startGame',component: StartGameComponent,canActivate:[AuthGuard]},
    {path:'endGame',component: EndGameComponent,canActivate:[AuthGuard]}
];

const appRouter = RouterModule.forRoot(appRoutes);

@NgModule({
    imports: [appRouter]
})
export class AppRoutingModule { }
import { createStore, Store } from "vuex";
import { paramsModule } from "@/store/modules/params";
import { elevatorModule } from "@/store/modules/elevator";
import type { State } from "../../env";

export const store: Store<State> = createStore({
    modules: {
        paramsModule,
        elevatorModule
    }
});
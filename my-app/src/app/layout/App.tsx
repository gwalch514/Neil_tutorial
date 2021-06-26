import { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { NavBar } from "../../features/nav/NavBar";
import ActivityDashboard from "../activities/dashboard/ActivityDashboard";
import ActivityStore from "../stores/activityStore";
import { LoadingComponent } from "./LoadingComponent";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import { ActivityForm } from "../activities/form/ActivityForm";
import { ActivityDetails } from "../activities/details/ActivityDetails";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route path="/activities/:id" component={ActivityDetails} />
        <Route path="/createActivity" component={ActivityForm} />
      </Container>
    </Fragment>
  );
};

export default observer(App);

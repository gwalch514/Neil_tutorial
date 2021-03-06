import React, { ChangeEvent, useContext, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
interface IProp {
  activity: IActivity;
}

export const ActivityForm: React.FC<IProp> = observer(
  ({ activity: initialFormState }) => {
    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, cancelFormOpen } =
      activityStore;
    const initializeForm = () => {
      if (initialFormState) {
        return initialFormState;
      } else {
        return {
          id: "",
          title: "",
          category: "",
          description: "",
          date: "",
          city: "",
          venue: "",
        };
      }
    };

    const handleSubmit = () => {
      if (activity.id.length === 0) {
        let newActivity = {
          ...activity,
          id: uuid(),
        };
        createActivity(newActivity);
      } else {
        editActivity(activity);
      }
    };
    const [activity, setActivity] = useState<IActivity>(initializeForm);
    const handleInputChange = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = event.target;
      setActivity({ ...activity, [name]: value });
    };

    return (
      <Segment clearing>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            onChange={handleInputChange}
            placeholder="Title"
            name="title"
            value={activity.title}
          />
          <Form.TextArea
            onChange={handleInputChange}
            rows={2}
            placeholder="Description"
            name="description"
            value={activity.description}
          />
          <Form.Input
            onChange={handleInputChange}
            placeholder="Category"
            name="category"
            value={activity.category}
          />
          <Form.Input
            onChange={handleInputChange}
            type="datetime-local"
            placeholder="Date"
            name="date"
            value={activity.date}
          />
          <Form.Input
            onChange={handleInputChange}
            placeholder="City"
            name="city"
            value={activity.city}
          />
          <Form.Input
            onChange={handleInputChange}
            placeholder="Venue"
            name="venue"
            value={activity.venue}
          />
          <Button
            loading={submitting}
            floated="right"
            positive
            type="submit"
            content="Submit"
          />
          <Button
            onClick={cancelFormOpen}
            floated="right"
            type="submit"
            content="Cancel"
          />
        </Form>
      </Segment>
    );
  }
);

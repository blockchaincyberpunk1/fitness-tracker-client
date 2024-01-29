import React from "react";
import { Form, Input, InputNumber, Button } from "antd";

/**
 * Component to add a new activity.
 * It includes a form for entering the activity's name and duration.
 *
 * @param {Object} props - Component props
 * @param {Function} props.addActivity - Function to call for adding a new activity
 * @returns {React.ReactElement} The rendered component
 */
function AddActivity({ addActivity }) {
  const [form] = Form.useForm();

  /**
   * Calculates calories burned based on the activity duration.
   *
   * @param {number} duration - Duration of the activity in minutes
   * @returns {number} The calculated calories burned
   */
  const calculateCaloriesBurned = (duration) => {
    // Example: Assuming 5 calories are burned per minute
    return duration * 5;
  };

  /**
   * Handles the form submission.
   * It calculates the calories burned, sets the default date, and invokes the addActivity function.
   *
   * @param {Object} values - The form values
   */
  const handleSubmit = (values) => {
    // Calculate caloriesBurned based on duration
    values.caloriesBurned = calculateCaloriesBurned(values.duration);

    // Set the default date to now
    values.date = new Date();

    console.log(values); // To check the form values
    addActivity(values);
    form.resetFields(); // Reset form fields after submission
  };

  return (
    <Form form={form} onFinish={handleSubmit} className="add-activity-form">
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input the activity name!" }]}
      >
        <Input
          type="text"
          placeholder="Activity name"
          className="input-field"
        />
      </Form.Item>
      <Form.Item
        name="duration"
        rules={[
          { required: true, message: "Please input the duration!" },
          {
            type: "number",
            min: 1,
            message: "Duration must be at least 1 minute",
          },
        ]}
      >
        <InputNumber
          placeholder="Duration (in minutes)"
          className="input-field"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="submit-button">
          Add Activity
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddActivity;

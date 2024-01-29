import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import "./EditActivity.css"; // Import the CSS file

/**
 * Component for editing an existing activity.
 * It provides a form for editing the name and duration of the activity.
 *
 * @param {Object} props - Component props
 * @param {Object} props.activity - The activity object to edit
 * @param {Function} props.saveEdit - Function to call when the activity is saved
 * @param {Function} props.cancelEdit - Function to call to cancel the edit
 * @returns {React.ReactElement} The rendered component
 */
function EditActivity({ activity, saveEdit, cancelEdit }) {
  const [form] = Form.useForm();

  useEffect(() => {
    // Set initial form values to the current activity
    form.setFieldsValue(activity);
  }, [form, activity]);

  /**
   * Handles the save action for the form.
   * Validates the form and then calls saveEdit with the updated activity data.
   */
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        // Recalculate calories burned based on the new duration
        const updatedCalories = calculateCaloriesBurned(values.duration);
        const updatedActivity = { ...values, caloriesBurned: updatedCalories };
        saveEdit(updatedActivity);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div className="edit-activity-form">
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item
          name="name"
          label="Activity Name"
          rules={[
            { required: true, message: "Please input the activity name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration (minutes)"
          rules={[
            { required: true, message: "Please input the duration!" },
            {
              type: "number",
              min: 1,
              message: "Duration must be at least 1 minute",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        {/* Add more fields if necessary */}

        <div className="edit-activity-form-button-group">
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
          <Button
            type="default"
            onClick={cancelEdit}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditActivity;

/**
 * Calculates the calories burned based on activity duration.
 *
 * @param {number} duration - Duration of the activity in minutes
 * @returns {number} Calculated calories burned
 */
function calculateCaloriesBurned(duration) {
  const caloriesPerMinute = 5; // Adjust this value as necessary
  return duration * caloriesPerMinute;
}

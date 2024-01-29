import React, { useState } from "react";
import { Button, Modal } from "antd";
import EditActivity from "./EditActivity";
import "./ActivityList.css";

/**
 * Displays a list of activities and provides options to edit or delete each activity.
 *
 * @param {Object} props - Component props
 * @param {Array} props.activities - List of activity objects to display
 * @param {Function} props.onUpdate - Function to call when an activity is updated
 * @param {Function} props.onDelete - Function to call when an activity is deleted
 * @returns {React.ReactElement} Rendered component
 */
function ActivityList({ activities, onUpdate, onDelete }) {
  const [editingActivity, setEditingActivity] = useState(null);

  /**
   * Initiates the editing process for an activity.
   *
   * @param {Object} activity - The activity to be edited
   */
  const startEdit = (activity) => {
    setEditingActivity(activity);
  };

  /**
   * Saves the updated activity and clears the editing state.
   *
   * @param {Object} updatedActivity - The updated activity data
   */
  const saveEdit = (updatedActivity) => {
    onUpdate(editingActivity._id, updatedActivity);
    setEditingActivity(null);
  };

  /**
   * Cancels the editing process.
   */
  const cancelEdit = () => {
    setEditingActivity(null);
  };

  return (
    <div>
      {activities.map((activity) => (
        <div key={activity._id} className="activity-item">
          <h3 style={{ color: "#0A1D56" }}>{activity.name}</h3>
          <p>Duration: {activity.duration} minutes</p>
          <p>Calories Burned: {activity.caloriesBurned}</p>
          <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
          <Button style={{ margin: "5px" }} onClick={() => startEdit(activity)}>
            Edit
          </Button>
          <Button
            style={{ margin: "5px" }}
            onClick={() => onDelete(activity._id)}
          >
            Delete
          </Button>
        </div>
      ))}
      {editingActivity && (
        <Modal
          title="Edit Activity"
          open={!!editingActivity}
          footer={null}
          onCancel={cancelEdit}
        >
          <EditActivity
            activity={editingActivity}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
          />
        </Modal>
      )}
    </div>
  );
}

export default ActivityList;

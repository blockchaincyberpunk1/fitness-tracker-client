import React, { useState, useEffect } from "react";
import ActivityList from "./components/ActivityList";
import AddActivity from "./components/AddActivity";
import EditActivity from "./components/EditActivity";
import { notification } from "antd";
import logoImage from "./images/logo3.png";

import "./App.css";

/**
 * Main application component.
 * Manages the state and functionality of the fitness tracker application.
 * @returns {React.ReactElement} The rendered application.
 */
function App() {
  const [activities, setActivities] = useState([]); // State to hold the list of activities
  const [editingActivity, setEditingActivity] = useState(null); // State to track the activity being edited

  /**
   * Fetches activities data from the server and updates the state.
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Fetches activity data from the server.
   */

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/activities");
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      } else {
        throw new Error("Failed to fetch activities.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /**
   * Adds a new activity.
   * @param {Object} newActivity - The activity to be added.
   */
  const addActivity = async (newActivity) => {
    // Calculate caloriesBurned or set a default date here if needed
    newActivity.caloriesBurned = calculateCaloriesBurned(newActivity.duration);
    newActivity.date = new Date(); // Set to current date, or use a date from the form

    try {
      const response = await fetch("http://localhost:3000/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newActivity),
      });

      if (response.ok) {
        const addedActivity = await response.json();
        setActivities([...activities, addedActivity]);
        notification.success({
          message: "Success",
          description: "Activity added successfully!",
        });
      }
    } catch (error) {
      console.error("Error adding activity:", error);
      notification.error({
        message: "Error",
        description: "Failed to add activity.",
      });
    }
  };

  /**
   * Updates an existing activity.
   * @param {string} id - The ID of the activity to update.
   * @param {Object} updatedActivity - The updated activity data.
   */
  const updateActivity = async (id, updatedActivity) => {
    try {
      const response = await fetch(`http://localhost:3000/activities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedActivity),
      });

      if (response.ok) {
        fetchData(); // Refetch activities after update
        notification.success({
          message: "Success",
          description: "Activity updated successfully!",
        });
      } else {
        throw new Error("Failed to update activity.");
      }
    } catch (error) {
      console.error("Error updating activity:", error);
      notification.error({
        message: "Error",
        description: "Failed to update activity.",
      });
    }
  };

  /**
   * Deletes an activity.
   * @param {string} id - The ID of the activity to delete.
   */
  const deleteActivity = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/activities/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setActivities(activities.filter((activity) => activity._id !== id));
        notification.success({
          message: "Success",
          description: "Activity deleted successfully!",
        });
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      notification.error({
        message: "Error",
        description: "Failed to delete activity.",
      });
    }
  };

  return (
    <div className="app-container">
      <div className="logo-container">
        <img src={logoImage} alt="Logo" className="app-logo" />{" "}
        {/* Add your logo */}
      </div>
      <h1 className="app-header">Fitness Tracker</h1>
      <AddActivity addActivity={addActivity} />
      {editingActivity && (
        <EditActivity
          activity={editingActivity}
          saveEdit={(updatedActivity) => {
            updateActivity(editingActivity._id, updatedActivity);
            setEditingActivity(null); // Close edit form after saving
          }}
          cancelEdit={() => setEditingActivity(null)}
        />
      )}
      <ActivityList
        activities={activities}
        onUpdate={updateActivity}
        onDelete={deleteActivity}
      />
    </div>
  );
}

export default App;

/**
 * Helper function to calculate calories burned.
 * @param {number} duration - Duration of the activity in minutes.
 * @returns {number} Calculated calories burned.
 */
function calculateCaloriesBurned(duration) {
  const caloriesPerMinute = 5; // Adjust this value as necessary
  return duration * caloriesPerMinute;
}

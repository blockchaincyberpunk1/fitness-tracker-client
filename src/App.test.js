import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import fetchMock from "jest-fetch-mock";

// Mock the fetch function
fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

test("renders the fitness tracker header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Fitness Tracker/i);
  expect(headerElement).toBeInTheDocument();
});

test("fetches activities from API and displays them", async () => {
  const activities = [
    { _id: "1", name: "Running", duration: 30, caloriesBurned: 150 },
    { _id: "2", name: "Cycling", duration: 45, caloriesBurned: 225 },
  ];

  fetch.mockResponseOnce(JSON.stringify(activities));

  render(<App />);

  await waitFor(() => {
    activities.forEach((activity) => {
      expect(screen.getByText(activity.name)).toBeInTheDocument();
    });
  });
});

test("adds a new activity", async () => {
  const newActivity = {
    _id: "3",
    name: "Swimming",
    duration: 60,
    caloriesBurned: 300,
  };

  fetch.mockResponseOnce(JSON.stringify(newActivity), { status: 200 });

  render(<App />);

  // Simulate user actions to add an activity
  // Note: You may need to adjust these based on your actual form fields and buttons
  fireEvent.change(screen.getByPlaceholderText(/Activity Name/i), {
    target: { value: "Swimming" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Duration/i), {
    target: { value: "60" },
  });
  fireEvent.click(screen.getByText(/Add Activity/i));

  await waitFor(() => {
    expect(screen.getByText(newActivity.name)).toBeInTheDocument();
  });
});

// Add more tests for editing and deleting activities

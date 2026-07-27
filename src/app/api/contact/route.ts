import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const newSubmission = {
      name,
      email,
      subject: subject || "No Subject",
      message,
      timestamp: new Date().toISOString(),
    };

    // Node.js server log
    console.log("----------------------------------------");
    console.log("NEW CONTACT SUBMISSION:");
    console.log(`From: ${newSubmission.name} <${newSubmission.email}>`);
    console.log(`Subject: ${newSubmission.subject}`);
    console.log(`Message: ${newSubmission.message}`);
    console.log("----------------------------------------");

    // Local file persistence (simulating a database)
    const filePath = path.join(process.cwd(), "submissions.json");
    let submissionsList = [];

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        submissionsList = JSON.parse(fileContent);
        if (!Array.isArray(submissionsList)) {
          submissionsList = [];
        }
      } catch (err) {
        console.error("Error reading submissions.json, resetting list:", err);
        submissionsList = [];
      }
    }

    submissionsList.push(newSubmission);

    // Save to submissions.json
    fs.writeFileSync(filePath, JSON.stringify(submissionsList, null, 2), "utf-8");

    return NextResponse.json(
      { message: "Your submission was recorded successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error in contact route:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
export async function GET() {
  return NextResponse.json(
    { message: "Contact route is active. Send POST requests to submit messages." },
    { status: 200 }
  );
}

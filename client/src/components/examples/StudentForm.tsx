import { StudentForm } from "../StudentForm";

export default function StudentFormExample() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <StudentForm
        onSubmit={(data) => console.log("Student data submitted:", data)}
        onCancel={() => console.log("Form cancelled")}
      />
    </div>
  );
}

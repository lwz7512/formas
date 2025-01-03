export const FormSchemaDesigner = () => {
  return (
    <div className="flex flex-col gap-4 " style={{ height: '77vh' }}>
      <iframe
        width="100%"
        height="100%"
        src="http://localhost:5174/just-form-designer"
      ></iframe>
    </div>
  );
};

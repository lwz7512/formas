const MyComponent = () => {
  const { data, error, loading } = useDeleteData('https://api.example.com/resource', { id: '123', otherParam: 'value' });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data && data.message}</div>;
};

const useDeleteData = (url, params) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const deleteData = useCallback(async () => {
    try {
      // 将参数对象转换为查询字符串
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${url}?${queryString}`, {
        method: 'DELETE',
      });
      setData(response.ok ? { message: 'Resource deleted successfully' } : null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url, params]);

  useEffect(() => {
    deleteData();
  }, [url, params]);

  return { data, error, loading };
};

export default useDeleteData;

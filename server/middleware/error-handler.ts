export function errorHandler(err: unknown, _req: unknown, res: { status: (code: number) => { json: (body: unknown) => unknown } }, _next: () => void) {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
}

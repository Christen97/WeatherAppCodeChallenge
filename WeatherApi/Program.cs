var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAngularApp", policy =>
  {
    policy.WithOrigins("http://localhost:4200")
      .AllowAnyHeader()
      .AllowAnyMethod();
  });});

builder.Services.AddControllers();
builder.Services.AddMemoryCache();
var app = builder.Build();

app.UseCors("AllowAngularApp");
app.MapControllers();
app.Run();

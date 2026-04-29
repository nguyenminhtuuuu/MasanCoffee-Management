using MasanCoffee.API;
using Microsoft.EntityFrameworkCore;
using MasanCoffee.API.Services;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<KhoService>();
builder.Services.AddScoped<KeToanService>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// mo khoa cors cho angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200") 
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseRouting();

app.UseCors("AllowAngular");

app.UseAuthorization();
app.MapControllers();
app.Run();

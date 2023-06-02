var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient("OMDb", httpClient =>
{
    httpClient.BaseAddress = new Uri("http://www.omdbapi.com/?apikey=9a5ade55&");
    httpClient.DefaultRequestHeaders.Add("Accept", "application/json; charset=utf-8");
    httpClient.DefaultRequestHeaders.Add("User-Agent", "HttpClientFactory-Sample");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
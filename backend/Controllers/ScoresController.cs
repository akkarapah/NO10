using Microsoft.AspNetCore.Mvc;
using MockupApi.Models;
using MockupApi.Services;

namespace MockupApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScoresController : ControllerBase
    {
        private readonly ScoreService _service;

        public ScoresController(ScoreService service) => _service = service;

        [HttpGet]
        public IActionResult GetAll() => Ok(_service.GetScores());

        [HttpPost]
        public IActionResult Add([FromBody] ScoreRequest request)
        {
            if (string.IsNullOrEmpty(request.Name))
            {
                return BadRequest("Name is required");
            }
            
            var score = _service.AddScore(request.Name, request.Score, request.MaxScore);
            return CreatedAtAction(nameof(GetAll), new { id = score.Id }, score);
        }
        
        [HttpDelete]
        public IActionResult ClearAll()
        {
            _service.ClearScores();
            return NoContent();
        }
    }
    
    public class ScoreRequest
    {
        public string Name { get; set; } = string.Empty;
        public int Score { get; set; }
        public int MaxScore { get; set; }
    }
}

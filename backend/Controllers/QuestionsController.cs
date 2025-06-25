using Microsoft.AspNetCore.Mvc;
using MockupApi.Services;

namespace MockupApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly QuestionService _service;

        public QuestionsController(QuestionService service) => _service = service;

        [HttpGet]
        public IActionResult GetAll() => Ok(_service.GetQuestions());

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var question = _service.GetQuestion(id);
            return question == null ? NotFound() : Ok(question);
        }
    }
}

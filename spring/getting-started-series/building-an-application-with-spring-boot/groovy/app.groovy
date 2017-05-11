@RestController
class ThisClassCanBeNamedAnything {

    @RequestMapping("/")
    String home() {
        return "Hello World!"
    }

}
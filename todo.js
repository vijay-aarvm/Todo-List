$(document).ready(function () {
    $("#add-task").click(function () {
        let msg = $(".write-task").val();
        let isTaskRepeated = false;
        $("li span").each(function () {
            let content = $(this).text();
            if (msg.toLowerCase() === content.toLowerCase()) {
                isTaskRepeated = true;
                return false;
            }
        });
        if (msg !== "" && !isTaskRepeated) {
            $("#tasks").append(`
          <li id="task-row">
            <span>${msg}</span>
            <button class="edit-todo">✎</button>
            <button class="remove-todo">✗</button>
          </li>
        `);
        } else if (msg === "") {
            alert("Can't add an empty task!");
        } else {
            alert("Task already exists!");
        }
        $(".write-task").val("");
    });
});

$(document).on('click', '.remove-todo', function () {
    $(this).closest("#task-row").remove();
})

$(document).on('click', '.edit-todo', function () {
    let currentTask = $(this).siblings("span");
    let currentText = currentTask.text();
    currentTask.replaceWith(`<input type="text" class="edit-input" autofocus value="${currentText}"></input>`);
    $(this).text('✓').addClass("save-todo").removeClass("edit-todo");
    $(this).siblings(".remove-todo").remove();
});

$(document).on('click', '.save-todo', function () {
    let editedText = $(this).siblings(".edit-input").val();
    let currentTask = $(this).parent().find(".edit-input");
    currentTask.replaceWith(`<span class="task-test">${editedText}</span>`);
    $(this).text("✎").addClass("edit-todo").removeClass("save-todo");
    $(this).parent().append(`<button class="remove-todo">✗</button>`);
});

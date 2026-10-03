describe("Books App - Favorite books and authorization tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // 1. Проверка отображения главной страницы
  it("Should successfully display main page", () => {
    cy.contains("Books list").should("be.visible");
  });

  // 2. Успешная авторизация
  it("Should successfully login", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  // 3. Неуспешная авторизация с пустым email
  it("Should show error on empty email", () => {
    cy.login(null, "test");
    cy.get("#mail:invalid").should("exist");
  });

  // 4. Добавление книги в избранное через чекбокс при создании
  it("Should successfully add book to favorites on creation", () => {
    cy.login("test@test.com", "test");
    cy.addBook("Гарри Поттер", "Фэнтези роман", "Дж. Роулинг", true);
    cy.contains("Favorites").click();
    cy.contains("Гарри Поттер").should("be.visible");
  });

  // 5. Добавление существующей книги в избранное кликом по кнопке
  it("Should add existing book to favorites from main list", () => {
    cy.login("test@test.com", "test");
    cy.addBook("Хоббит", "Приключения", "Дж. Толкин", false);
    cy.contains("Хоббит")
      .parent()
      .parent()
      .contains("Add to favorite")
      .click();
    cy.contains("Favorites").click();
    cy.contains("Хоббит").should("be.visible");
  });

  // 6. Удаление книги из избранного
  it("Should successfully delete book from favorites", () => {
    cy.login("test@test.com", "test");
    cy.contains("Favorites").click();

    // Берем название первой книги в избранном
    cy.get(".card-title").first().then(($title) => {
      const deletedBookTitle = $title.text();

      // Нажимаем удалить
      cy.contains("Delete from favorite").first().click();

      // Проверяем, что книги с таким названием больше нет на странице
      cy.contains(deletedBookTitle).should("not.exist");
    });
  });
});

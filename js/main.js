
  $(document).ready(function(){

	// Устанавливаем обработчик потери фокуса для всех полей ввода текста
	$('input#name, input#email, textarea#message, input#checkbox').unbind().blur( function(){

		// console.log($('input#name, input#email, textarea#message,input#checkbox'));

	   // Для удобства записываем обращения к атрибуту и значению каждого поля в переменные
		var id = $(this).attr('id');
		var val = $(this).val();
		
	   // console.log(('id = '+ id +'  --/--  val = ' + val));

	  // После того, как поле потеряло фокус, перебираем значения id, совпадающие с id данного поля
	  switch(id)
	  {
			// Проверка поля "Имя"
			case 'name':
			   var rv_name = /^[a-zA-Zа-яА-Я]+$/; // используем регулярное выражение

			   // Eсли длина имени больше 2 символов, оно не пустое и удовлетворяет рег. выражению,
			   // то добавляем этому полю класс .not_error,
			   // и ниже в контейнер для ошибок выводим слово " Принято", т.е. валидация для этого поля пройдена успешно

			   if(val.length > 2 && val != '' && rv_name.test(val))
			   {
				//    console.log('name--valid');
				  $(this).addClass('not_error');
				  $(this).next('.my-form__error-box').text('Принято')
											.css('color','green')
											.animate({'paddingLeft':'10px'},400)
											.animate({'paddingLeft':'5px'},400);
			   }

			 // Иначе, мы удаляем класс not-error и заменяем его на класс error, говоря о том что поле содержит ошибку валидации,
			 // и ниже в наш контейнер выводим сообщение об ошибке и параметры для верной валидации

			   else
			   {
					// console.log('name -- non  valid');
				  $(this).removeClass('not_error').addClass('error');
				  $(this).next('.my-form__error-box').html('поле "Имя" обязательно для заполнения<br>, длина имени должна составлять не менее 2 символов<br>, поле должно содержать только русские или латинские буквы')
											 .css('color','red')
											 .css('color','red')
											 .animate({'paddingLeft':'10px'},400)
											 .animate({'paddingLeft':'5px'},400);
			   }
		   break;

		  // Проверка email
		  case 'email':
			  var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
			  if(val != '' && rv_email.test(val))
			  {
				//  console.log('email -- valid');
				 $(this).addClass('not_error');
				 $(this).next('.my-form__error-box').text('Принято')
										   .css('color','green')
										   .animate({'paddingLeft':'10px'},400)
										   .animate({'paddingLeft':'5px'},400);
			  }
			  else
			  {
					// console.log('email -- non  valid');
				 $(this).removeClass('not_error').addClass('error');
				 $(this).next('.my-form__error-box').html('поле "Email" обязательно для заполнения<br>, поле должно содержать правильный email-адрес<br>')
											.css('color','red')
											.animate({'paddingLeft':'10px'},400)
											.animate({'paddingLeft':'5px'},400);
			  }
		break;


		 // Проверка поля "Сообщение"
		case 'message':
			 if(val != '' && val.length < 5000)
			 {
				// console.log('message -- valid');
				$(this).addClass('not_error');
				$(this).next('.my-form__error-box').text('Принято')
										  .css('color','green')
										  .animate({'paddingLeft':'10px'},400)
										  .animate({'paddingLeft':'5px'},400);
			 }
			 else
			 {
				// console.log('message -- non valid');
				$(this).removeClass('not_error').addClass('error');
				$(this).next('.my-form__error-box').html('поле "Текст письма" обязательно для заполнения')
										  .css('color','red')
										  .animate({'paddingLeft':'10px'},400)
										  .animate({'paddingLeft':'5px'},400);
			 }
		break;


	  } // end switch(...)

	});
	 // end blur()



//отмечаем всплывающее окно для checkbox по нажатию на элемент 
$('input#checkbox').on("click", function() {
    if ($('input#checkbox').prop('checked') == true){

		// console.log('checkbox -- valid');
		$('input#checkbox').addClass('not_error');
		$('input#checkbox').parent().children('.my-form__error-box').text('Принято')
									.css('color','green')
									.animate({'paddingLeft':'10px'},400)
									.animate({'paddingLeft':'5px'},400);
	}
});

	$('form#my-form').submit(function(e){
		
		e.preventDefault();
	
		if ($('input#checkbox').prop('checked') == false){

			// console.log('checkbox -- non valid check it');
			$('input#checkbox').removeClass('not_error').addClass('error');
			$('input#checkbox').parent().children('.my-form__error-box').html('поле "обработка персональных даннных" обязательно для заполнения')
										.css('color','red')
										.animate({'paddingLeft':'10px'},400)
										.animate({'paddingLeft':'5px'},400);
		}

		if(($('.not_error').length == 4))
        {
            //При успешном выполнении отправляем форму 

			console.log('-----------------------------------------------------------');
			console.log('---------------------- Форма отправлена -------------------');
			console.log('---------- Имя = '+ $('input#name').val());
			console.log('---------- Почта = '+ $('input#email').val());
			console.log('---------- Сообщение = '+ $('textarea#message').val());
			console.log('-----------------------------------------------------------');
			console.log('-----------------------------------------------------------');
			// $('input#checkbox').parent().children('.my-form__error-box').html('поле "обработка персональных даннных" обязательно для заполнения')
			// 							.css('color','red')
			// 							.animate({'paddingLeft':'10px'},400)
			// 							.animate({'paddingLeft':'5px'},400);

			$('.project-alert-console').show(1000, function(){
				setTimeout(function(){
				  $('.project-alert-console').hide(500);
				}, 2000);
			  });
			
										
		}
        // Иначе, если количество полей с данным классом не равно значению 3, мы возвращаем false,
        // останавливая отправку сообщения в не валидной форме
       	else
       	{
			console.log('-----------------------------------------------------------');
			console.log('--------- Ошибка проверьте форму и заполните поля ---------');
			console.log('-----------------------------------------------------------');


			//проверка полей на пустые значения при отправке
			if (($('.my-form__label .project-input').val() )== '') {
				
				$('.my-form__label .project-input').removeClass('not_error').addClass('error');
				$('.my-form__label .project-input').next('.my-form__error-box').html('заполните поле')
										   .css('color','red')
										   .animate({'paddingLeft':'10px'},400)
										   .animate({'paddingLeft':'5px'},400);
			}
			if (($('.my-form__label .project-textarea').val() )== '') {
				
				$('.my-form__label .project-textarea').removeClass('not_error').addClass('error');
				$('.my-form__label .project-textarea').next('.my-form__error-box').html('заполните поле')
										   .css('color','red')
										   .animate({'paddingLeft':'10px'},400)
										   .animate({'paddingLeft':'5px'},400);
			}
			
          	return false;
       	}
		
		
  }); // end submit()

 }); // end script
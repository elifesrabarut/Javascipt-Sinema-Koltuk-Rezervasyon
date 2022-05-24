const container=document.querySelector('.container');//container clasındakiler seçildiğinde
const count=document.getElementById('count');
const amount=document.getElementById('amount');
const select=document.getElementById('movie');
const seats=document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();




container.addEventListener('click',function(e)
{//seçim yapılma aşaması
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){//event tetiklendiğinde contains metoduyla tıklanılan seat classından mı diye bakılır,seçilmişleri alma!
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change',function(e){

        calculateTotal();
});

function calculateTotal(){
    const selectedSeats=container.querySelectorAll('.seat.selected');

    const selectedSeatsArr=[];
    const seatsArr=[];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);

    });

    seats.forEach(function(seat){
        seatsArr.push(seat);
    });
// [1,3,5] index numarasını verir
    let selectedSeatIndexs=selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });


    let selectedSeatCount=selectedSeats.length;
    count.innerText=selectedSeatCount;
    amount.innerText=selectedSeatCount * select.value;
//localstorage ile bilgileri kaydetme
    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !=null && selectedSeats.length > 0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)> -1){
                seat.classList.add('selected');
            }

        });
    }
    const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !=null){
        select.selectedIndex=selectedMovieIndex;

    }
}

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats',JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}
//localstroga'dan bilet bilgilerinin alınması
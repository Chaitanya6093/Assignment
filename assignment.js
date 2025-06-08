document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.box');
    const totalPriceElement = document.getElementById('total-price');
    let selectedBox = null;
    
    // Calculate discount based on box ID
    function getDiscount(boxId) {
        switch(boxId) {
            case 'box1': return 0.10; 
            case 'box2': return 0.20;
            case 'box3': return 0.30; 
            default: return 0;
        }
    }
    
    // Calculate and update price for a box
    function updateBoxPrice(box) {
        const basePrice = parseFloat(box.dataset.basePrice);
        const discount = getDiscount(box.id);
        const discountedPrice = basePrice * (1 - discount);
        box.querySelector('.current-price').textContent = discountedPrice.toFixed(2);
    }
    
    // Update total price based on selected box
    function updateTotalPrice() {
        if (selectedBox) {
            const price = parseFloat(selectedBox.querySelector('.current-price').textContent);
            totalPriceElement.textContent = price.toFixed(2);
        } else {
            totalPriceElement.textContent = '0.00';
        }
    }
    
    // Close all boxes
    function closeAllBoxes() {
        boxes.forEach(box => {
            box.classList.remove('active');
        });
        selectedBox = null;
        updateTotalPrice();
    }
    
    // Initialize box prices
    boxes.forEach(box => {
        updateBoxPrice(box);
        
        box.addEventListener('click', function(e) {
            e.stopPropagation();
            boxes.forEach(otherBox => {
                if (otherBox !== box && otherBox.classList.contains('active')) {
                    otherBox.classList.remove('active');
                }
            });
            
            // Toggle current box
            this.classList.toggle('active');
            
            // Update selected box
            if (this.classList.contains('active')) {
                selectedBox = this;
            } else {
                selectedBox = null;
            }
            
            updateTotalPrice();
        });
        
        // Handle size option
        const sizeOptions = box.querySelectorAll('.size-options .option');
        sizeOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                sizeOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Handle color option
        const colorOptions = box.querySelectorAll('.color-options .option');
        colorOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                colorOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
    
    // Close boxes
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.box')) {
            closeAllBoxes();
        }
    });
    
    // Add to cart
    const addToCartBtn = document.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (!selectedBox) {
            alert('Please select an option first!');
            return;
        }
        
        const size = selectedBox.querySelector('.size-options .option.active').dataset.size;
        const color = selectedBox.querySelector('.color-options .option.active').dataset.color;
        const price = selectedBox.querySelector('.current-price').textContent;
        const unit = selectedBox.querySelector('.unit').textContent;
        
        alert(`Added to cart:\n${unit}\nSize: #${size}\nColor: ${color}\nPrice: $${price}`);
    });
});
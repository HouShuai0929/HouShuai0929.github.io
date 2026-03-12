// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 关闭移动菜单（如果打开）
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 考虑导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });
    
    // 回到顶部按钮
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100', 'visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 滚动动画
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    // 初始检查
    fadeInOnScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', fadeInOnScroll);
    
    // 使用 GSAP 添加更复杂的动画
    if (typeof gsap !== 'undefined') {
        // Hero 区域动画
        gsap.from('#home h1', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.2
        });
        
        gsap.from('#home p', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5
        });
        
        gsap.from('#home .flex', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.8
        });
        
        // 作品卡片动画
        gsap.utils.toArray('.work-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: i * 0.1
            });
        });
    }
    
    // 表单提交处理
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const formDataObject = {};
            
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
            
            // 在实际应用中，这里会发送数据到服务器
            // 这里仅做演示，显示提交成功消息
            alert('提交成功');
            contactForm.reset();
        });
    }
});
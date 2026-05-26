"""Chatbot views — AI chatbot placeholder."""
import uuid
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import ChatSession, ChatMessage
from .serializers import ChatSessionSerializer, ChatMessageSerializer, ChatRequestSerializer

# Predefined responses for the AI chatbot placeholder
BOT_RESPONSES = {
    'default': "Thank you for your interest in BuildRanchi Pro! I can help you with:\n\n1. Construction services\n2. Booking a consultation\n3. Getting a free quote\n4. Project inquiries\n5. Cost estimation\n\nPlease type a number or describe what you need!",
    'construction': "We offer comprehensive construction services in Ranchi including:\n- Residential Construction (₹1,800-2,500/sq.ft.)\n- Commercial Construction (₹2,200-3,500/sq.ft.)\n- Villa Construction (₹2,500-4,000/sq.ft.)\n\nWould you like to book a free consultation?",
    'booking': "To book a consultation, please:\n1. Visit our Booking page\n2. Select your preferred date and time\n3. Choose consultation type\n4. Fill in your details\n\nOr call us directly at +91 98765 43210",
    'quote': "For a free quotation, please provide:\n- Project type (Residential/Commercial)\n- Plot area (in sq.ft.)\n- Number of floors\n- Budget range\n\nOr fill our detailed quotation form!",
    'cost': "Our estimated construction costs in Ranchi:\n- Basic: ₹1,500-1,800/sq.ft.\n- Standard: ₹1,800-2,500/sq.ft.\n- Premium: ₹2,500-3,500/sq.ft.\n- Luxury: ₹3,500-5,000/sq.ft.\n\nCosts include materials, labor, and basic finishing.",
    'contact': "You can reach us at:\n📞 Phone: +91 98765 43210\n💬 WhatsApp: +91 98765 43210\n📧 Email: info@buildranchi.com\n📍 Address: Main Road, Ranchi, Jharkhand 834001",
}


def get_bot_response(message: str) -> str:
    """Generate a bot response based on the user message."""
    msg_lower = message.lower()
    if any(w in msg_lower for w in ['construction', 'build', 'house', 'home', 'construct']):
        return BOT_RESPONSES['construction']
    elif any(w in msg_lower for w in ['book', 'appointment', 'consultation', 'visit']):
        return BOT_RESPONSES['booking']
    elif any(w in msg_lower for w in ['quote', 'quotation', 'price', 'pricing']):
        return BOT_RESPONSES['quote']
    elif any(w in msg_lower for w in ['cost', 'rate', 'budget', 'estimate', 'per sq']):
        return BOT_RESPONSES['cost']
    elif any(w in msg_lower for w in ['contact', 'phone', 'email', 'address', 'reach']):
        return BOT_RESPONSES['contact']
    return BOT_RESPONSES['default']


@api_view(['POST'])
def chat_message(request):
    """Send a message to the AI chatbot."""
    serializer = ChatRequestSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    session_id = serializer.validated_data.get('session_id')
    message = serializer.validated_data['message']

    # Get or create session
    if session_id:
        try:
            session = ChatSession.objects.get(session_id=session_id)
        except ChatSession.DoesNotExist:
            session = ChatSession.objects.create(session_id=session_id, user=request.user if request.user.is_authenticated else None)
    else:
        session = ChatSession.objects.create(user=request.user if request.user.is_authenticated else None)

    # Save user message
    user_msg = ChatMessage.objects.create(
        session=session,
        message=message,
        response='',
        message_type='user',
    )

    # Generate bot response
    bot_response = get_bot_response(message)

    # Save bot response
    ChatMessage.objects.create(
        session=session,
        message=bot_response,
        response='',
        message_type='bot',
    )

    return Response({
        'success': True,
        'data': {
            'session_id': str(session.session_id),
            'message': message,
            'response': bot_response,
        }
    })


class ChatSessionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ChatSessionSerializer

    def get_queryset(self):
        return ChatSession.objects.filter(user=self.request.user)